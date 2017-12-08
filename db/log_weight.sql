insert into weight (user_id, weight, date) values ($1, $2, $3)
returning *;