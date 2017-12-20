{
	"info": {
		"name": "Enpoint Testing NeboFit",
		"_postman_id": "19cc9f3c-5c32-bb75-dcf4-389952be47f0",
		"description": "",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "GET - Auth",
			"request": {
				"method": "GET",
				"header": [],
				"body": {},
				"url": {
					"raw": "localhost:8080/api/auth/me",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"api",
                        "auth",
                        "me"
					]
				},
				"description": ""
			},
			"response": []
        },
        {
			"name": "GET - Today Sleep",
			"request": {
				"method": "GET",
				"header": [],
				"body": {},
				"url": {
					"raw": "localhost:8080/api/data/getTodaySleep/3/2017-12-19/get",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"api",
                        "data",
                        "getTodaySleep",
                        "3",
                        "2017-12-19",
                        "get"
					]
				},
				"description": ""
			},
			"response": []
        },
        {
			"name": "GET - Today Activity",
			"request": {
				"method": "GET",
				"header": [],
				"body": {},
				"url": {
					"raw": "localhost:8080/api/data/getTodayActivity/3/2017-12-19/get",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"api",
                        "data",
                        "getTodayActivity",
                        "3",
                        "2017-12-19",
                        "get"
					]
				},
				"description": ""
			},
			"response": []
        },
        {
			"name": "GET - Today Weight",
			"request": {
				"method": "GET",
				"header": [],
				"body": {},
				"url": {
					"raw": "localhost:8080/api/data/getTodayWeight/3/2017-12-19/get",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"api",
                        "data",
                        "getTodayWeight",
                        "3",
                        "2017-12-19",
                        "get"
					]
				},
				"description": ""
			},
			"response": []
        },
        {
			"name": "GET - Today Nutrition",
			"request": {
				"method": "GET",
				"header": [],
				"body": {},
				"url": {
					"raw": "localhost:8080/api/data/getTodayNutrition/3/2017-12-19/get",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"api",
                        "data",
                        "getTodayNutrition",
                        "3",
                        "2017-12-19",
                        "get"
					]
				},
				"description": ""
			},
			"response": []
        },
        {
			"name": "GET - All Data",
			"request": {
				"method": "GET",
				"header": [],
				"body": {},
				"url": {
					"raw": "localhost:8080/api/data/getAllData/3",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"api",
                        "data",
                        "getAllData",
                        "3"
					]
				},
				"description": ""
			},
			"response": []
        },
        {
			"name": "POST - Since Last Login",
			"request": {
				"method": "POST",
				"header": [],
				"body": {},
				"url": {
					"raw": "localhost:8080/api/data/getSinceLastLogin/3/2017-12-19/get",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"api",
                        "data",
                        "getSinceLastLogin",
                        "3",
                        "2017-12-19",
                        "get"
					]
				},
				"description": ""
			},
			"response": []
        },
        {
			"name": "POST - Update Last Login",
			"request": {
				"method": "POST",
				"header": [],
				"body": {},
				"url": {
					"raw": "localhost:8080/api/data/updateLastLogin/3/2017-12-19",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"api",
                        "data",
                        "updateLastLogin",
                        "3",
                        "2017-12-19"
					]
				},
				"description": ""
			},
			"response": []
        },
        {
			"name": "PUT - Update Goals",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
                    "goal_weight": 180, 
                    "goal_sleep": 8,
                    "goal_steps": 10000,
                    "goal_hydration": 75,
                    "goal_calories": 2000
                },
				"url": {
					"raw": "localhost:8080/api/data/updateGoals/3",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"api",
                        "data",
                        "updateGoals",
                        "3"
					]
				},
				"description": ""
			},
			"response": []
        }
	]
}