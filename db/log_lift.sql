insert into lifts (user_id, date, lift, reps, sets, weight, rpe) values ($1, $2, $3, $4, $5, $6, $7)
returning *;