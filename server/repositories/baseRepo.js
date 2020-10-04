const EntityNotExistException = require('../exceptions/business/entityNotExistException');

module.exports = class BaseRepo {
    constructor() {
        this.dataProvider = undefined;
    }

    /**
    * Query document with pagination support
    * @param {Object} filter - Mongo filter
    * @param {Object} options - Query options
    * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
    * @param {number} [options.limit] - Maximum number of results per page (default = 10)
    * @param {number} [options.page] - Current page (default = 1)
    * @returns {Promise<QueryResult>}
    */
    async query(filter, options) {
        const items = await this.dataProvider.paginate(filter, options);
        return items;
    }

    /**
    * Query document without pagination
    * @param {Object} filter - Mongo filter
    * @param {Object} options - Query options
    * @returns {Promise<QueryResult>}
    */
    async findAll(filter) {
        const items = await this.dataProvider.find(filter);
        return items;
    }

    /**
     * Find one entity through id
     * @param {string} id
     */
    async findOne(id) {
        return await this.dataProvider.findById(id);
    }

    /**
     * Find all entities through a custom field
     * @param {any} value : The field value 
     * @param {string} filedName : The field name
     */
    async findOneByField(value, filedName) {
        return await this.repo.findOne({ [filedName]: value });
    }


    /**
     * Creating an entity inside the database
     * @param {*} obj : The entity to be created
     */
    async create(obj) {
        return await this.repo.create(obj);
    }

    /**
     * Updating an entity through using id
     * @param {string} id : The id
     * @param {*} obj : The entity to be updated
     */
    async updateById(id, updateBody) {
        const entity = await this.findById(id);
        if (!entity) {
            throw new EntityNotExistException();
        }
        Object.assign(entity, updateBody);
        await entity.save();
        return entity;
    }

    /**
    * Updating an entity through using a custom field to search for it
    * @param {any} value : The field value 
    * @param {string} filedName : The field name
    * @param {*} obj : The entity to be updated
     */
    async updateByField(fieldValue, filedName, updateBody) {
        const entity = await this.findOneByField(fieldValue, filedName);
        if (!entity) {
            throw new EntityNotExistException();
        }
        Object.assign(entity, updateBody);
        await entity.save();
        return entity;
    }

    /**
     * Deleting an entity from database
     * @param {string} id : The id
     */
    async deleteById(id) {
        const entity = await this.findOne(id);
        if (!entity) {
            throw new EntityNotExistException();
        }
        await entity.remove();
        return entity;
    }
}