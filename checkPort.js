/**
 * @name checkPort
 * @author JungHyunKwon
 * @since 2018-09-22
 */

'use strict';

const net = require('net');

/**
 * @param {number} port
 * @param {function} callback {boolean}
 */
module.exports = (port, callback) => {
	//숫자일 때
	if(typeof port === 'number' && !isNaN(port) && isFinite(port)) { 
		//함수일 때
		if(typeof callback === 'function') {
			let server = net.createServer();

			server.once('listening', () => {
				server.once('close', () => {
					callback(false);
				}).close();	
			}).once('error', (error) => {
				callback(true);
			});

			server.listen(port);
		}else{
			console.error('callback : 함수가 아닙니다.');
		}
	}else{
		console.error('port : 숫자가 아닙니다.');
	}
};