update users
set goal_weight = $2, 
    goal_sleep = $3,
    goal_steps = $4,
    goal_hydration = $5,
    goal_calories = $6
where user_id = $1
returning *;