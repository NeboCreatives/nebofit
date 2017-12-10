select * from nutrition
where user_id = $1
order by date desc