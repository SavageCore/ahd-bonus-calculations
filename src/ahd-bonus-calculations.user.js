// ==UserScript==
// @name         AHD Bonus Calculations
// @namespace    https://savagecore.eu
// @version      0.1.0
// @description  Calculate remaining points needed
// @author       SavageCore
// @include      http*://awesome-hd.me/bonus.php*
// @grant        none
// @downloadURL  https://github.com/SavageCore/ahd-bonus-calculations/raw/master/src/ahd-bonus-calculations.user.js
// @require      https://raw.githubusercontent.com/zachleat/Humane-Dates/master/humane.js
// ==/UserScript==
//
/* global document humaneDate */

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
				const cost = parseInt(col.innerText.match(/(.*) Points/g)[0].replace(/,/g, ''), 10);
				const remainingPoints = cost - currentPoints;
				const timeLeft = remainingPoints / pointsPerDay;
				const projectedDate = new Date();
				projectedDate.setDate(projectedDate.getDate() + timeLeft);
				col.title = 'Exact days left: ' + timeLeft;
				col.innerHTML = col.innerHTML.replace(/Not enough points!/, remainingPoints.toLocaleString() + ' Points remaining<br />' + humaneDate(projectedDate) + ' left');
			}
		}
	}
})();
