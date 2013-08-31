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
				cities.push(this.semantic[x].name);
				//emit(key, { semantic: this.semantic[x], utime: this.utime });
			}
		}
		for(var x = 0; x < people.length; x++) {
			emit(people[x], { cities: cities, utime: this.utime });
		}
	},
	function(key, values) {
		
	},
	{
		query: { "semantic._type": "Person", "semantic._type": "City"  },
		out: "reduce_test"
	}
)