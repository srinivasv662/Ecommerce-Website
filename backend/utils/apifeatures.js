class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ?
        {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        }
        : {};

        // console.log(keyword);

        this.query = this.query.find({...keyword});
        return this;
    }

    filter() {
        // const queryCopy = this.queryStr              // since this.queryStr is an Object, if u change queryCopy then this.queryStr will also change
        const queryCopy = {...this.queryStr}            // this spread operator will create the copy of this.queryStr, now it is all good
        // console.log(queryCopy);

        // Removing Some fields for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach(key => delete queryCopy[key]);
        // console.log(queryCopy);
        // this.query = this.query.find({...queryCopy});

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        // console.log(queryStr);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;