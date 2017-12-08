update nutrition
set calories = $3, 
    carbs = $4,
    fat = $5,
    protein = $6,
    water = $7
where user_id = $1 and date = $2
returning *;