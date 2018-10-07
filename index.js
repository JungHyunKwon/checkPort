/**
 * @name checkPort
 * @author JungHyunKwon
 * @since 2018-09-22
 */

'use strict';

const net = require('net');

/**
 * @param {number} port
 * @param {function} callback
 * @return {boolean}
 */
module.exports = (port, callback) => {
	//함수일때
	if(typeof callback === 'function') {
		let server = net.createServer();

		server.once('listening', () => {
			server.once('close', () => {
				callback(false);
			});
			
			server.close();	
		}).once('error', (error) => {
			callback(true);
		});

		server.listen(port);
	}
};