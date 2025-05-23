
-- Create a function to decrease product stock
CREATE OR REPLACE FUNCTION decrease_stock(p_id UUID, amount INT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE products
  SET stock = stock - amount
  WHERE id = p_id AND stock >= amount;
END;
$$;
