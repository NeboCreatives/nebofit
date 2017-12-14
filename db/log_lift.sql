insert into lifts (user_id, date, lift, reps, sets, weight, rpe, lbs_per_rpe) values ($1, $2, $3, $4, $5, $6, $7, $8)
returning *;