#!/usr/bin/env python
# coding: utf-8

# In[1]:

# In[2]:


import dash
import plotly as pl
import pandas as pd
import mysql.connector


# In[3]:


def criar_conexao_servidor(usuario, senha, host, nome_bd):
    conexao = None
    try:
        conexao = mysql.connector.connect(
            host=host,
            user=usuario,
            passwd=senha,
            database=nome_bd
        )
        print("MySQL DB conectado com sucesso")
    except Error as err:
        print(f"Erro: '{err}'")
    
    return conexao


# In[4]:


conexao = criar_conexao_servidor('root', '', 'localhost', 'apollo')


# In[5]:


cursor = conexao.cursor()


# In[6]:


#CONSULTA TOTAL DAS PRESTAÇOES JUNTO AO MÊS
query_faturamento_mes = """
SELECT MONTH(DiaData) AS mes, (Adicional + SUM(preco)) AS total 
FROM prestacao, prestacao_servico, prestacao_data, servico, data 
WHERE prestacao.IDPrestacao = prestacao_servico.IDPrestacao 
AND prestacao.IDPrestacao = prestacao_data.IDPrestacao 
AND prestacao_servico.IDServico = servico.id 
AND prestacao_data.IDData = data.IDData 
GROUP BY prestacao.IDPrestacao;
"""

cursor.execute(query_faturamento_mes)
resultado_query = cursor.fetchall()
resultado_query


# In[7]:


#CONSULTA TOTAL DE PRESTAÇÕES POR MÊS
query_valor_arrecadado = """
SELECT 
    mes,
    SUM(total) AS Valor_Arrecadado
FROM (
    SELECT 
        MONTH(DiaData) AS mes, 
        prestacao.IDPrestacao,
        (Adicional + COALESCE(SUM(servico.preco), 0)) AS total
    FROM 
        prestacao
    JOIN 
        prestacao_servico ON prestacao.IDPrestacao = prestacao_servico.IDPrestacao
    JOIN 
        servico ON prestacao_servico.IDServico = servico.id
    JOIN 
        prestacao_data ON prestacao.IDPrestacao = prestacao_data.IDPrestacao
    JOIN 
        data ON prestacao_data.IDData = data.IDData
    GROUP BY 
        mes, prestacao.IDPrestacao
) AS subquery
GROUP BY 
    mes;
"""
cursor.execute(query_valor_arrecadado)
resultado_query = cursor.fetchall()
resultado_query


# In[ ]:


#FATURAMENTO LÍQUIDO POR MÊS (SOMA_VALOR_SERVIÇOS - (CUSTOS + DIARIAS))


# In[13]:


#TOTAL DE PRESTAÇÕES REALIZADAS POR MÊS
query_prestacoes_mes = """
SELECT COUNT(prestacao.IDPrestacao) as qtd_prestacoes, MONTH(DiaData) as mes
FROM prestacao, prestacao_data, data
WHERE prestacao.IDPrestacao = prestacao_data.IDData 
AND prestacao_data.IDData = data.IDData
GROUP BY mes;
"""
cursor.execute(query_prestacoes_mes)
resultado_query = cursor.fetchall()
resultado_query


# In[15]:


#QUANTIDADE DE SERVIÇOS POR PRESTAÇÃO
query_servicos_qtd="""
SELECT COUNT(prestacao_servico.IDServico) as qtd, servico.nome
FROM prestacao, prestacao_servico, servico
WHERE prestacao.IDPrestacao = prestacao_servico.IDPrestacao
AND prestacao_servico.IDServico = servico.id
GROUP BY servico.nome
ORDER BY qtd;
"""
cursor.execute(query_servicos_qtd)
resultado_query = cursor.fetchall()
resultado_query


# In[11]:


#TOTAL DE FUNCIONARIOS
query_total_funcionarios = """
SELECT COUNT(*) FROM funcionario
"""
cursor.execute(query_total_funcionarios)
resultado_query = cursor.fetchall()
resultado_query


# In[16]:


#GASTOS TOTAIS COM FUNCIONÁRIOS
query_gastos_funcionarios="""
SELECT 
    MONTH(data.DiaData) AS mes,
    SUM(soma_diarias) as gasto_total_diaria
FROM (
    SELECT 
        prestacao.IDPrestacao, 
        SUM(funcionario.diaria) as soma_diarias
    FROM 
        prestacao
    JOIN 
        prestacao_funcionario ON prestacao.IDPrestacao = prestacao_funcionario.IDPrestacao
    JOIN 
        funcionario ON prestacao_funcionario.IDFuncionario = funcionario.id
    GROUP BY 
        prestacao.IDPrestacao
) as somas_diarias_prestacao
JOIN prestacao_data ON somas_diarias_prestacao.IDPrestacao = prestacao_data.IDPrestacao
JOIN data ON prestacao_data.IDData = data.IDData
GROUP BY 
    mes;
"""
cursor.execute(query_gastos_funcionarios)
resultado_query = cursor.fetchall()
resultado_query

