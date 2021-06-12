/*
* ntp-client
* https://github.com/moonpyk/node-ntp-client
*
* Copyright (c) 2013 Clément Bourgeois
* Licensed under the MIT license.
*/

// Part of code from moonpyk

var cp = require('child_process');

var dgram = require('dgram');

var defaultNtpPort = 123;
var defaultNtpServer = "ntp1.aliyun.com";

/**
 * Amount of acceptable time to await for a response from the remote server.
 * Configured default to 10 seconds.
 */
var ntpReplyTimeout = 10000;

/**
 * Fetches the current NTP Time from the given server and port.
 * @param {string} server IP/Hostname of the remote NTP Server
 * @param {number} port Remote NTP Server port number
 * @param {function(Object, Date)} callback(err, date) Async callback for
 * the result date or eventually error.
 */
function getNetworkTime(server, port, callback) {
	if (callback === null || typeof callback !== "function") {
		return;
	}

	server = server || defaultNtpServer;
	port = port || defaultNtpPort;

	var client = dgram.createSocket("udp4"),
		ntpData = new Buffer(48);

	// RFC 2030 -> LI = 0 (no warning, 2 bits), VN = 3 (IPv4 only, 3 bits), Mode = 3 (Client Mode, 3 bits) -> 1 byte
	// -> rtol(LI, 6) ^ rotl(VN, 3) ^ rotl(Mode, 0)
	// -> = 0x00 ^ 0x18 ^ 0x03
	ntpData[0] = 0x1B;

	for (var i = 1; i < 48; i++) {
		ntpData[i] = 0;
	}

	var timeout = setTimeout(function () {
		client.close();
		callback("Timeout waiting for NTP response.", null);
	}, ntpReplyTimeout);

	// Some errors can happen before/after send() or cause send() to was impossible.
	// Some errors will also be given to the send() callback.
	// We keep a flag, therefore, to prevent multiple callbacks.
	// NOTE : the error callback is not generalised, as the client has to lose the connection also, apparently.
	var errorFired = false;

	client.on('error', function (err) {
		if (errorFired) {
			return;
		}

		callback(err, null);
		errorFired = true;

		clearTimeout(timeout);
	});

	client.send(ntpData, 0, ntpData.length, port, server, function (err) {
		if (err) {
			if (errorFired) {
				return;
			}
			clearTimeout(timeout);
			callback(err, null);
			errorFired = true;
			client.close();
			return;
		}

		client.once('message', function (msg) {
			clearTimeout(timeout);
			client.close();

			// Offset to get to the "Transmit Timestamp" field (time at which the reply
			// departed the server for the client, in 64-bit timestamp format."
			var offsetTransmitTime = 40,
				intpart = 0,
				fractpart = 0;

			// Get the seconds part
			for (var i = 0; i <= 3; i++) {
				intpart = 256 * intpart + msg[offsetTransmitTime + i];
			}

			// Get the seconds fraction
			for (i = 4; i <= 7; i++) {
				fractpart = 256 * fractpart + msg[offsetTransmitTime + i];
			}

			var milliseconds = (intpart * 1000 + (fractpart * 1000) / 0x100000000);

			// **UTC** time
			var date = new Date("Jan 01 1900 GMT");
			date.setUTCMilliseconds(date.getUTCMilliseconds() + milliseconds);

			var styledstr = (function(s){
				var fmt = 'yyyy-MM-DD hh:mm:ss';
				var o = {
					'M+': s.getMonth() + 1,
					'd+': s.getDate(),
					'D+': s.getDate(),
					'h+': s.getHours(),
					'm+': s.getMinutes(),
					's+': s.getSeconds(),
					'q+': ((s.getMonth + 3)/3)|0,
					'S': s.getMilliseconds()
				}
				if(new RegExp('(y+)').test(fmt)){
					fmt = fmt.replace(RegExp.$1, (s.getFullYear().toString()).substr(4-RegExp.$1.length));
				}
				for(var k in o){
					if(new RegExp('('+k+')').test(fmt)){
						fmt = fmt.replace(RegExp.$1, RegExp.$1.length==1? o[k]: ("00"+o[k]).substr((''+o[k]).length));
					}
				}
				return fmt;
			})(date);

			callback(null, date, styledstr);
		});
	});
};

getNetworkTime(defaultNtpServer,
				defaultNtpPort,
				function (err, date, str) {
					if (err) {
						console.error(err);
						return;
					}

					console.log(date, str);

					cp.exec('date -u -s \''+str+'\'', function(err, stdout, stderr){
						if(err){
							console.log('Error: '+stderr);
						}
						console.log(stdout);
					});
				});
