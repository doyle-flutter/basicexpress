class SQL{
    constructor(){
        this.tableName = "app", 
        this.databaseName = "dbs";
        this.COLUMN_TITLE = 'title';
        this.COLUMN_DES = 'title';
    }

    createSQL = () => `INSERT INTO ${this.tableName} (${this.COLUMN_TITLE}, ${this.COLUMN_DES}) VALUES (?, ?)`;

    readAllSQL = () => `SELECT * FROM ${this.tableName}`;
    readLimitSQL = ({counter}) => `SELECT * FROM ${this.tableName} LIMIT ${counter}`
    
    updateTargetSQL = () => `UPDATE ${this.tableName} SET ${this.COLUMN_TITLE}=?, ${this.COLUMN_DES}=? WHERE id=? `;
}

module.exports = new SQL();