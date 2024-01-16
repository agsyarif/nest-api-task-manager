import { Column, MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddColumnTaskCategoryIdToTaskTable1705375466761 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "tasks",
            new TableColumn({
                name: "taskCategoryId",
                type: "integer",
                isNullable: true
            })
        )

        await queryRunner.createForeignKey(
            "tasks",
            new TableForeignKey({
                columnNames: ["taskCategoryId"],
                referencedColumnNames: ["id"],
                referencedTableName: "taskCategories",
                onDelete: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const table = await queryRunner.getTable("tasks")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("taskCategoryId") !== -1,
        )

        await queryRunner.dropForeignKey("tasks", foreignKey)
        await queryRunner.dropColumn("tasks", "taskCategoryId")
    }

}
