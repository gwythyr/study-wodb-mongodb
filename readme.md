### Shell
	mongo
	show dbs
	use study

1. `db.getCollectionInfos().length`
2. `db.books.count()`
3. `db.books.find()`
4. `db.books.updateOne({ title: "MongoDB in Action" }, { $set: { title: { $toUpper: "$title" } }  })`
5. `db.books.updateMany({ pageCount: { $gt: 1000 }}, { $set: { title: { $toUpper: $title } }  })`
6. `db.books.updateMany({ authors: { $elemMatch: { $eq: "Vikram Goyal" } } }, { $set: { authorDetails: { firstName: "Vikram", lastName: "Goyal" } } } )`
7. `db.books.aggregate([{ $match: { "authorDetails.firstName": "Vikram" } }, { $sort: { publishedDate: -1 } }, { $project: { authors: 1, publishedDate: 1, title: 1 }} ])`

   `db.books.aggregate([{ $unwind: "$authors" }, { $group: { _id: "$authors", books: { $push: { _id: "$_id", title: "$title" } } } }])`

   `db.books.aggregate([{ $unwind: "$categories" }, { "$group": { _id: "$categories", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 10 }])`
