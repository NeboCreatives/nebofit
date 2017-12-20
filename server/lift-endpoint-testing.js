{
	"info": {
		"name": "Lift Enpoint Testing NeboFit",
		"_postman_id": "19cc9f3c-5c32-bb75-dcf4-389952be47f0",
		"description": "",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "GET - All Lifts",
			"request": {
				"method": "GET",
				"header": [],
				"body": {},
				"url": {
					"raw": "localhost:8080/api/data/getAllLifts/3",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
                        "api",
                        "data",
                        "getAllLifts",
                        "3"
					]
				},
				"description": ""
			},
			"response": []
        },
        
		{
			"name": "POST - Log Lift",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
                    "date": "2017-12-19",
                    "lift": "SQUAT",
                    "reps": 5,
                    "sets": 1,
                    "weight": 285,
                    "rpe": 9
                },
				"url": {
					"raw": "localhost:8080/api/data/logLift/3",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
                        "api",
                        "data",
                        "logLift",
                        "3"
					]
				},
				"description": ""
			},
			"response": []
        },
		{
			"name": "POST - Log Lifts",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
                    "sets": 
                    [
                        {
                            "date": "2017-12-19",
                            "workout": "SQUAT",
                            "reps": 5,
                            "sets": 1,
                            "weight": 300,
                            "rpe": 9
                        },
                        {
                            "date": "2017-12-19",
                            "workout": "SQUAT",
                            "reps": 5,
                            "sets": 1,
                            "weight": 310,
                            "rpe": 10
                        }
                    ]
                },
				"url": {
					"raw": "localhost:8080/api/data/logLifts/3",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
                        "api",
                        "data",
                        "logLifts",
                        "3"
					]
				},
				"description": ""
			},
			"response": []
        },
		{
			"name": "PUT - Update Lift",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
                    "date": "2017-12-10",
                    "lift": "SQUAT",
                    "reps": 5,
                    "sets": 1,
                    "weight": 285,
                    "rpe": 9
                },
				"url": {
					"raw": "localhost:8080/api/data/updateLift/1",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
                        "api",
                        "data",
                        "updateLift",
                        "1"
					]
				},
				"description": ""
			},
			"response": []
        }
    ]
}