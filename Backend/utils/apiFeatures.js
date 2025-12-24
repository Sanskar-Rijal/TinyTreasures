class APIFeatures {
  constructor(query, queryString) {
    //query is basically our Moongoose query
    //queryString is req.query
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const queryObj = { ...this.queryString };
    const { keyword } = queryObj;

    const fields = keyword
      ? {
          name: {
            $regex: `^${keyword}`,
            $options: "i",
          },
        }
      : {};

    // this.query = this.query.find({
    //   name: { $regex: `^${name}`, $options: "i" },
    // });
    this.query = this.query.find({ ...fields });
    return this; //returning the entire object for chanining
  }

  filter() {
    const queryObj = { ...this.queryString };

    //okay now we will remove some fields,
    //we have already searched product by name so we exclude that and we will exclude page and limit which i will handle in
    //pagination
    const excludedFields = ["keyword", "page", "limit"];
    excludedFields.forEach((element) => delete queryObj[element]);
    //console .log bata { difficulty: 'easy', page: '2', limit: '10', duration: { gte: '5' } } yo auxa
    //aba mongoose lai $gte chainxa so
    let queryStr = JSON.stringify(queryObj);
    //adding $ using regular expression
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    console.log(JSON.parse(queryStr));

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
}

export default APIFeatures;
