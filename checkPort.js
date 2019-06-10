/**
 * @name checkPort
 * @author JungHyunKwon
 * @since 2018-09-22
 */

'use strict';

const net = require('net');

/**
 * @name 숫자 확인
 * @since 2017-12-06
 * @param {*} value
 * @return {boolean}
 */
function isNumeric(value) {
	return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * @param {number} port
 * @param {function} callback {boolean, boolean}
 */
module.exports = (port, callback) => {
	let callbackIsFunction = typeof callback === 'function';

	//숫자일 때
	if(isNumeric(port)) { 
		let server = net.createServer();

		server.once('listening', () => {
			server.once('close', () => {
				//함수일 때
				if(callbackIsFunction) {
					callback(undefined, false);
				}
			}).close();	
		}).once('error', err => {
			//함수일 때
			if(callbackIsFunction) {
				callback(undefined, true);
			}
		});

		server.listen(port);
	
	//함수일 때
	}else if(callbackIsFunction) {
		callback(true);
	}
};