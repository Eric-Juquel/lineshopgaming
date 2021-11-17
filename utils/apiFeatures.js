class APIFeatures {
  constructor(model, queryStr) {
    this.model = model;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {};

    this.model = this.model.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    console.log('query', queryCopy)

    //Remove fields from query
    const removeFields = ['keyword', 'page'];
    removeFields.forEach((el) => delete queryCopy[el]);

    console.log('query2', queryCopy)

    this.model = this.model.find(queryCopy);
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.model = this.model.limit(resPerPage).skip(skip);
    return this;
  }

}

export default APIFeatures;
