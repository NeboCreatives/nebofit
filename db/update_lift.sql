update lifts
set lift = $3, 
    reps = $4,
    sets = $5,
    weight = $6,
    rpe = $7
where lift_id = $1 and date = $2
returning *;