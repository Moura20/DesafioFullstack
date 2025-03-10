SELECT 
    v.vendedor_id, 
    vend.nome AS nome_vendedor,
    v.produto_id, 
    p.nome AS nome_produto,
    SUM(v.quantidade) AS total_vendas
FROM vendas v
JOIN vendedores vend ON v.vendedor_id = vend.id
JOIN produtos p ON v.produto_id = p.id
WHERE v.data_venda BETWEEN '2023-05-01' AND '2023-05-31'
GROUP BY v.vendedor_id, v.produto_id, vend.nome, p.nome
ORDER BY total_vendas DESC;
