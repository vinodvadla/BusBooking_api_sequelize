'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Bookings', 'seatNo', {
      type: Sequelize.INTEGER
    })

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Bookings', 'seatNo')
  }
};
