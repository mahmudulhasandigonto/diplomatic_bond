<template>
<div id="window">
	<div id="year" @click="toggleZoom" ref="year"></div>
</div>
</template>

<script>
import moment from "moment";
export default {
	name: 'CalendarTimeline',  
	mounted(){
		let element = this.$refs.year;
		let months = this.getMonths('2018-02-01', '2018-05-12');
		this.printMonthsDays(element, months);
		this.printBubble('2018-02-21', '2018-02-22', 'success')
		this.printBubble('2018-02-20', '2018-02-22', 'success')
		this.printBubble('2018-03-01', '2018-03-03', 'info')
		this.printBubble('2018-04-29', '2018-05-12', 'info')
		this.printBubble('2018-04-02', '2018-04-12', 'warning')
		this.printBubble('2018-03-05', '2018-03-12', 'danger')
		this.printBubble('2018-05-07', '2018-05-12', 'success')
	},
	methods: {
		getMonths(startDate, endDate) {
			let months = [];
			startDate = moment(startDate);
			endDate = moment(endDate);
			if (endDate.isBefore(startDate)) {
				months.push({ name: startDate.format("MMMM"), id: startDate.format("YYYY")+startDate.format("MM"), days: moment(startDate).daysInMonth() })
				alert("End date must be greater than start date.");
			}
			while (startDate.isBefore(endDate)) {
				months.push({ name: startDate.format("MMMM"), id: startDate.format("YYYY")+startDate.format("MM"), days: moment(startDate).daysInMonth() }) //{name:"",year:"", days:""}
				startDate.add(1, 'month');
			}
			return months;
		},
		printDays(item, month_div) {
			for (let day = 1; day <= item.days; day++) {
				let div = document.createElement('div');
				div.setAttribute('class', 'day');
				(day < 10) ? div.setAttribute('id', item.id + '0' + day) : div.setAttribute('id', item.id + day);
				month_div.appendChild(div);
			}
		},
		printMonthNames(item, month_div){
			let div = document.createElement('div');
			div.textContent = item.name;
			div.setAttribute('class', 'month-name');
			month_div.appendChild(div);
		},
		printMonthsDays(element, months) {
			months.forEach((item)=>{
				let div = document.createElement('div');
				div.setAttribute('class', 'month');
				this.printMonthNames(item, div)
				this.printDays(item, div)
				element.appendChild(div);
			})
		},
		getPositionAtCenter(element) {
			let { top, left, width, height } = element.getBoundingClientRect();
			return {
				x: left + width / 2,
				y: top + height / 2
			};
		},
		getDistanceBetweenElements(a, b) {
			let aPosition = this.getPositionAtCenter(a);
			let bPosition = this.getPositionAtCenter(b);

			return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
		},
		toggleZoom() {
			let element = this.$refs.year;
			element.classList.toggle("zoomed");
		},
		printBubble(first, last, type) {
		  first = first.replace(/-/g, '');
		  last = last.replace(/-/g, '');
		  
		  let first_div = document.getElementById(first);
		  let last_div = document.getElementById(last);
		  let distance = this.getDistanceBetweenElements(first_div, last_div);

		  let bubble_div = document.createElement('div');
		  bubble_div.classList.add('bubble');
		  bubble_div.style.width = distance + 'px';
		  bubble_div.style.height = distance + 'px';
		  
		  this.addType(bubble_div, type);
		  
		  first_div.appendChild(bubble_div);
		  let info = first + '\n' + last
		  this.printInfoDiv(first_div, info, type)
	  },
	  addType(div, type){
		  if (type == 'success') {
			  div.classList.add('bubble-success');
		  }
		  else if (type == 'warning') {
			  div.classList.add('bubble-warning');
		  }
		  else if (type == 'danger') {
			  div.classList.add('bubble-danger');
		  }
		  else {
			  div.classList.add('bubble-info');
		  }
	  },
	  printInfoDiv(bubble_parent_div, info, type){
			let bubble_info_div = document.createElement('div');
			bubble_info_div.classList.add('bubble-information');
			this.addType(bubble_info_div, type);
			bubble_info_div.textContent = info;
			bubble_parent_div.appendChild(bubble_info_div);

			let line_div = document.createElement('div');
			line_div.classList.add('line');
			bubble_parent_div.appendChild(line_div);

			this.connect(bubble_parent_div, bubble_info_div, line_div)
		},
		connect(from, to, line) {

			// let start = getPositionAtEdgeUp(from);
			// let end = getPositionAtEdgeDown(to);
			// console.log(start);

			var fT = from.offsetTop + from.offsetHeight / 2;
			var tT = to.offsetTop + to.offsetHeight / 2;
			var fL = from.offsetLeft + from.offsetWidth / 2;
			var tL = to.offsetLeft + to.offsetWidth / 2;

			var CA = Math.abs(tT - fT);
			var CO = Math.abs(tL - fL);
			var H = Math.sqrt(CA * CA + CO * CO);
			var ANG = 180 / Math.PI * Math.acos(CA / H);

			if (tT > fT) {
				var top = (tT - fT) / 2 + fT;
			} else {
				var top = (fT - tT) / 2 + tT;
			}
			if (tL > fL) {
				var left = (tL - fL) / 2 + fL;
			} else {
				var left = (fL - tL) / 2 + tL;
			}

			if ((fT < tT && fL < tL) || (tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)) {
				ANG *= -1;
			}
			top -= H / 2;

			line.style["-webkit-transform"] = 'rotate(' + ANG + 'deg)';
			line.style["-moz-transform"] = 'rotate(' + ANG + 'deg)';
			line.style["-ms-transform"] = 'rotate(' + ANG + 'deg)';
			line.style["-o-transform"] = 'rotate(' + ANG + 'deg)';
			line.style["-transform"] = 'rotate(' + ANG + 'deg)';
			line.style.top = top + 'px';
			line.style.left = left + 'px';
			line.style.height = H + 'px';
		}

	}
  };
</script>

<style>
body{
  font-family: roboto;
}
#window{
  margin: 0 auto;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  width: 100%;
  height: 100%;    
  position: relative;
  align-items: center;
  justify-content: center;
}
#year{
  display: flex;
  width: 100%;
  height: 100%;   
  background: linear-gradient(to right,rgba(240, 255, 255, 1), rgba(255,0,0,0), rgba(240, 255, 255, 1));
  transition: 1.5s;
  transform-origin: 0 0;
  overflow-x: scroll;
}
#year.zoomed{
  /* margin-top: -25%; */
  transform: scale(1.50);
}
#year:after {
  content: '';
  width: 100%;
  border-bottom: solid 20px rgba(121, 252, 123, 0.8);
  position: absolute;
  left: 0;
  top: 48%;
}
#year .month{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  position: relative;
}
.month .month-name{
  position: absolute;
  text-transform: uppercase;
  z-index: 10;
}
.day{
  display: flex;
  align-items: center;
  flex: 1 1 auto;
}
.bubble {
  border-radius: 50%;
  position: fixed;
  -webkit-transition: color 0.5s linear, background-color 0.5s linear;
  -moz-transition: color 0.5s linear, background-color 0.5s linear;
  -o-transition: color 0.5s linear, background-color 0.5s linear;
  transition: color 0.5s linear, background-color 0.5s linear;
  z-index: 4;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
  filter: alpha(opacity=50);
}
.bubble:hover{
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  filter: alpha(opacity=100);
  z-index: 5;
}
.bubble-information{
  width: 80px;
  height: 80px;
  border-radius: 5%;
  position: absolute;
  top: 20%;
  padding: 15px 5px;
  -webkit-transition: color 0.5s linear, background-color 0.5s linear;
  -moz-transition: color 0.5s linear, background-color 0.5s linear;
  -o-transition: color 0.5s linear, background-color 0.5s linear;
  transition: color 0.5s linear, background-color 0.5s linear;
  z-index: 4;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
  filter: alpha(opacity=50);
}
.bubble:hover+.bubble-information{
  z-index: 5;
}
.bubble-information:hover{
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  filter: alpha(opacity=100);
  z-index: 5;
}
.bubble-info{
  background-color: #5DC6F7;
  background-color: rgba(93, 198, 247, 0.5);
}
.bubble-info:hover {
  background-color: #98DAF8;
  background-color: rgba(152, 218, 248, 0.9);
}
.bubble-success{
  background-color: #3a4e20;
  background-color: rgba(58, 78, 32, 0.5);
}
.bubble-success:hover {
  background-color: #627746;
  background-color: rgba(98, 119, 70, 0.9);
}
.bubble-warning{
  background-color: #EBF152;
  background-color: rgba(235, 241, 82, 0.5);
}
.bubble-warning:hover {
  background-color: #DFE981;
  background-color: rgba(223, 233, 129, 0.9);
}
.bubble-danger{
  background-color: #F98F6D;
  background-color: rgba(249, 143, 109, 0.5);
}
.bubble-danger:hover {
  background-color: #FBB8A3;
  background-color: rgba(251, 184, 163, 0.9);
}

.line{
  position: absolute;
  width:1px;
  background-color:red;
} 
</style>