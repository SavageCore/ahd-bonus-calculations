// ==UserScript==
// @name         AHD Bonus Calculations
// @namespace    https://savagecore.eu
// @version      0.1.3
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

	const pointsPerDay = Number.parseInt(document.querySelector('#content > div > h3').textContent.replace(/^\D+|[,.]/g, ''), 10);
	if (pointsPerDay > 0) {
		const currentPoints = Number.parseInt(document.querySelector('#pointsStats').textContent.replace(/,/g, ''), 10);
		const table = document.querySelector('#content > div > div > table');

		for (let i = 0; i < table.rows.length; i++) {
			const row = table.rows[i];
			for (let j = 0; j < row.cells.length; j++) {
				const col = row.cells[j];
				if (i === 0 && col.textContent.includes('Not enough points!')) {
					const cost = Number.parseInt(col.textContent.match(/(.*) Points/g)[0].replace(/,/g, ''), 10);
					const remainingPoints = cost - currentPoints;
					const timeLeft = remainingPoints / pointsPerDay;
					const secondsLeft = (timeLeft - Math.floor(timeLeft)) * 86400;
					const projectedDate = new Date();
					projectedDate.setDate(projectedDate.getDate() + timeLeft);
					projectedDate.setSeconds(secondsLeft);
					col.title = 'Exact days left: ' + timeLeft;
					col.innerHTML = col.innerHTML.replace(/Not enough points!/, remainingPoints.toLocaleString() + ' Points remaining<br />' + humaneDate(projectedDate) + ' left');
				}
			}
		}
	}
})();
