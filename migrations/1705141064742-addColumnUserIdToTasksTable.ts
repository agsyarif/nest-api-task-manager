import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddColumnUserIdToTasksTable1705141064742 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "tasks",
            new TableColumn({
                name: "userId",
                type: "int"
            })
        )

        await queryRunner.createForeignKey(
            "tasks",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("tasks")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("userId") !== -1,
        )

        await queryRunner.dropForeignKey("tasks", foreignKey)
        await queryRunner.dropColumn("tasks", "userId")
    }

}
