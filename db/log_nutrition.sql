insert into nutrition (user_id, date, calories, carbs, fat, protein, water) values ($1, $2, $3, $4, $5, $6, $7)
returning *;