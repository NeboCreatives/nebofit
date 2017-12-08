update sleep
set total_minutes = $1, 
    efficiency = $2
where user_id = $3 and date = $4
returning *;