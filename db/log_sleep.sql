insert into sleep (user_id, total_minutes, efficiency, date) values ($1, $2, $3, $4)
returning *;