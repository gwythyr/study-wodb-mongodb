[
    {
        $match: {
            publishedDate: {
                $exists: true,
            },
        },
    },
    {
        $addFields: {
            publishedYear: {
                $year: "$publishedDate",
            },
        },
    },
    {
        $group: {
            _id: "$publishedYear",
            books: {
                $push: "$categories",
            },
        },
    },
    {
        $project: {
            categories: {
                $reduce: {
                    input: "$books",
                    initialValue: [],
                    in: {
                        $concatArrays: ["$$value", "$$this"],
                    },
                },
            },
        },
    },
    {
        $addFields: {
            categoriesStat: {
                $map: {
                    input: {
                        $setUnion: ["$categories"],
                    },
                    as: "m",
                    in: {
                        name: "$$m",
                        count: {
                            $size: {
                                $filter: {
                                    input: "$categories",
                                    as: "d",
                                    cond: {
                                        $eq: ["$$d", "$$m"],
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    {
        $addFields: {
            topCategory: {
                $function: {
                    body: function (categories) {
                        if (!categories || !categories.length)
                            return null;
                        return categories.sort(
                            (a, b) => a.count - b.count
                        )[0].name;
                    },
                    args: ["$categoriesStat"],
                    lang: "js",
                },
            },
        },
    },
]
