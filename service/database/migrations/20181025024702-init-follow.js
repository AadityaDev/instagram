'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const { INTEGER, DATE, STRING, NOW } = Sequelize;
		await queryInterface.createTable('follow', {
			id: {type: INTEGER(10), primaryKey: true, autoIncrement: true},// 评论id
			userId: {type: STRING(255)},// 
			followedId: {type: STRING(255)},// 
			status: {type: INTEGER(1), allowNull: false},// 
			created_at: {type: DATE, defaultValue: NOW},// 
			updated_at: {type: DATE, defaultValue: NOW}// 
		});
	},
	down: async queryInterface => {
		await queryInterface.dropTable('follow');
	}
};
