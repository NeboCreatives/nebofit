select * from weight
where user_id = $1
order by date desc limit 1