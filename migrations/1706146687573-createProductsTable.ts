import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductsTable1706146687573 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'products',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isGenerated: true,
                        isPrimary: true
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'price',
                        type: 'integer'
                    },
                    {
                        name: 'stock',
                        type: 'integer'
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: "CURRENT_TIMESTAMP",
                    },
                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products')
    }

}
