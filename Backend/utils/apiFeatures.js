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

  pagination(){
    const page = this.queryString.page * 1  || 1; //converting to number, default is 1 
    const limit= this.queryString.limit *1 || 10;//Default is 10 items
    const skip = (page-1)*limit;
    //page=2&limit=10,
    //euta page ma 10 wota dekhaune rey , so
    //at page 1 we have already shown 10 results,(1-10)
    //at page 2 we have to skip first 10 results(11-20)
    //at page 3 we have to skip first 20 results (21-30) and so on....
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default APIFeatures;
