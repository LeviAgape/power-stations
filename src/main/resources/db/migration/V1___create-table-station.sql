CREATE TABLE power_station (
    id TEXT NOT NULL PRIMARY KEY,
    id_power_station_aneel VARCHAR(255) NOT NULL,
    ide_nucleo_ecg VARCHAR(255),
    cod_ceg VARCHAR(255),
    sig_uf_principal CHAR(2),
    sig_tipo_geracao CHAR(100),
    nome_empreendimento VARCHAR(255),
    mda_potencial_outorgada_kw VARCHAR(100),
    mda_tensao_conexao VARCHAR(100),
    nome_empresa_conexao VARCHAR(100) ,
    num_cnpj_empresa_conexao VARCHAR(18)
);
