update weight
set weight = $2
where user_id = $1 and date = $3
returning *;