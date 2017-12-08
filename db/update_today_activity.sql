update activity
set calories = $3, 
    steps = $4,
    distance = $5
where user_id = $1 and date = $2
returning *;