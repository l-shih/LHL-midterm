SELECT title, description, price FROM items
  -- JOIN line_items ON line_items.item_id = items.id
  --   JOIN orders ON line_items.order_id = orders.id
  --     JOIN restaurants ON restaurants.id = items.restaurant_id
        WHERE restaurant_id = 1;
    --   SELECT item_id FROM 
    --     line_items JOIN orders ON line_items.order_id = orders.id
    --       WHERE order_id = 1
    -- );