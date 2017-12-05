insert into sleep (user_id, total_minutes, deep, light, rem, awake, efficiency, date) values ($1, $2, $3, $4, $5, $6, $7, $8)
returning *;