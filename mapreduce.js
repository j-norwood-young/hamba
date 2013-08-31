db.feeds.mapReduce(
	function() { 
		var people = [];
		var cities = [];
		for(var x = 0; x < this.semantic.length; x++) {
			if (this.semantic[x]._type == "Person") {
				people.push(this.semantic[x].name);
			}
		}
		for(var x = 0; x < this.semantic.length; x++) {
			if (this.semantic[x]._type == "City") {
				cities.push(this.semantic[x]);
				//emit(key, { semantic: this.semantic[x], utime: this.utime });
			}
		}
		for(var x = 0; x < people; x++) {
			emit(people[x], { cities: cities, utime: this.utime });
		}
	},
	function(key, values) {
		
	},
	{
		query: { utime: { $gt: 1377271222 }, "semantic._type": "Person", "semantic._type": "City"  },
		out: "reduce_test"
	}
)