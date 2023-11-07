import { Model } from "mongoose";

//generic crud class for all collections : abstract classes can't be inherited
export abstract class CRUD {
  // model
  abstract model: Model<any>;

  // protected classes can be accessed only through child classes or instances

  // Create - C
  protected async create<T>(data: any): Promise<T> {
    // here await is not used, should be used when invoking this method from the child classes or instances
    return this.model.create(data);
  }

  // findOne
  protected async findOne<T>(
    query: Object,
    options?: Object
  ): Promise<T | null> {
    return this.model.findOne(query, { _v: 0, password: 0, ...options }); // 0 is used in projection to avoid those fields
  }

  // findOneAndPopulate
  protected async findOneAndPopulate(
    query: Object,
    populateFields: any,
    options?: Object
  ) {
    return (
      this.model
        .findOne(query, { _v: 0, password: 0, ...options })
        //["populateField1", "PopulateField2"] --- multi populate
        .populate(populateFields)
    );
  }

  //find()
  protected async findAll<T>(query?: Object, options?: Object): Promise<T[]> {
    return this.model
      .find({ ...query }, { _v: 0, password: 0, ...options })
      .sort({ _id: -1 });
  }

  // findAndPopulate
  protected async findAndPopulate(
    query: Object,
    populateFields: any,
    options?: Object
  ) {
    return this.model
      .find(query, { _v: 0, password: 0, ...options })
      .populate(populateFields)
      .sort({ _id: -1 });
  }

  // findByIdAndUpdate
  protected async findByIdAndUpdate<T>(
    _id: string,
    data: Object
  ): Promise<T | null> {
    return this.model.findByIdAndUpdate(_id, data, {
      runValidators: true,
      new: true,
    });
  }

  // findOneAndUpdate : returns promise or null returned by mongo DB
  protected async findOneAndUpdate<T>(
    query: Object,
    data: Object
  ): Promise<T | null> {
    return this.model.findOneAndUpdate(query, data, {
      runValidators: true,
      new: true,
    });
  }
  //    findByIdAndDelete
  protected async findByIdAndDelete<T>(filter: Object): Promise<T | null> {
    return this.model.findByIdAndDelete(filter);
  }
}
