import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateChannelMethodTable1705714333825 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "channelMethod",
                columns: [
                    {
                        name: "channelMethodId",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true
                    },
                    {
                        name: "channelMethodName",
                        type: "varchar"
                    },
                    {
                        name: "bankCode",
                        type: "varchar"
                    },
                    {
                        name: "channelMethodCategory",
                        type: "varchar"
                    },
                    {
                        name: "adminFee",
                        type: "integer"
                    },
                    {
                        name: "inActive",
                        type: "boolean"
                    },
                    {
                        name: "imageUrl",
                        type: "varchar"
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "channelId",
                        type: "integer",
                        isNullable: true
                    }
                ]
            })
        )

        await queryRunner.createForeignKey(
            "channelMethod",
            new TableForeignKey({
                columnNames: ["channelId"],
                referencedColumnNames: ["channelId"],
                referencedTableName: "channel",
                onDelete: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("channelMethod")
    }

}
