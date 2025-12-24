class APIFeatures {
  constructor(query, queryString) {
    //query is basically our Moongoose query
    //queryString is req.query
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const queryObj = { ...this.queryString };
    const { name } = queryObj;

    this.query = this.query.find({
      name: { $regex: `^${name}`, $options: "i" },
    });
    return this; //returning the entire object for chanining
  }
}

export default APIFeatures;
