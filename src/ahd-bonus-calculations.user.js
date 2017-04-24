// ==UserScript==
// @name         AHD Bonus Calculations
// @namespace    https://savagecore.eu
// @version      0.1.0
// @description  Calculate remaining points needed
// @author       SavageCore
// @include      http*://awesome-hd.me/bonus.php*
// @grant        none
// @downloadURL  https://github.com/SavageCore/ahd-bonus-calculations/raw/master/src/ahd-bonus-calculations.user.js
// ==/UserScript==
//
/* global document */

(function () {
	'use strict';

	const currentPoints = parseInt(document.getElementById('pointsStats').innerText.replace(/,/g, ''), 10);
	const pointsPerDay = parseInt(document.querySelector('#content > div > h3').innerText.replace(/^\D+|[,.]/g, ''), 10);
	const table = document.querySelector('#content > div > div > table');

	for (let i = 0; i < table.rows.length; i++) {
		const row = table.rows[i];
		for (let j = 0; j < row.cells.length; j++) {
			const col = row.cells[j];
			if (i === 0 && col.innerText.indexOf('Not enough points!') !== -1) {
				const cost = parseInt(col.innerText.match(/(.*) Points/g)[0].replace(/^\D+|,/g, ''), 10);
				const remainingPoints = cost - currentPoints;
				const timeLeft = remainingPoints / pointsPerDay;
				col.title = 'Days left at current rate: ' + timeLeft;
			}
		}
	}
})();
