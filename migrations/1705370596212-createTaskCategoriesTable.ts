import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTaskCategoriesTable1705370596212 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "taskCategories",
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: "title",
                        type: "varchar"
                    }
                    // ,
                    // {
                    //     name: "created_at",
                    //     type: "timestamp"
                    // },
                    // {
                    //     name: "updated_at",
                    //     type: "timestamp"
                    // }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("taskCategories");
    }

}
