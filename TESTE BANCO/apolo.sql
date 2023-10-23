create database APOLO_DB;
use APOLO_DB;

create table CLIENTE(
	IDCliente int auto_increment primary key,
    NomeCliente varchar(80),
    NumeroCliente varchar(14),
    EnderecoCliente varchar(80)
)engine = InnoDB auto_increment=1 comment='Cadastro de Clientes';

create table FUNCIONARIO(
	IDFuncionario int auto_increment primary key,
    NomeFuncionario varchar(80),
    NumeroFuncionario varchar(14),
    EnderecoFuncionario varchar(80),
    DiariaFuncionario double
)engine = InnoDB auto_increment=1 comment='Cadastro de Funcionarios';

create table SERVICO (
    IDServico int auto_increment primary key,
    NomeServico VARCHAR(50),
    PrecoServico double
)engine = InnoDB auto_increment=1 comment='Cadastro de Serviços';

create table DATA (
    IDData int auto_increment primary key,
    DiaData date
)engine = InnoDB auto_increment=1 comment='Cadastro de datas';

create table CUSTO(
	IDCusto int auto_increment primary key,
    DescCusto varchar(80),
    ValorCusto double
)engine=InnoDB auto_increment=1 comment='Cadastro de Custos';

create table PRESTACAO (
    IDPrestacao INT AUTO_INCREMENT PRIMARY KEY,
    Adicional DECIMAL(10, 2),
    IDServico INT,
    IDCliente INT,
    FOREIGN KEY (IDServico) REFERENCES SERVICO(IDServico),
    FOREIGN KEY (IDCliente) REFERENCES CLIENTE(IDCliente)
)engine = InnoDB auto_increment=1 comment='Cadastro de prestações de serviço realizadas';

create table FUNCIONARIO_PRESTACAO (
    IDFuncionario INT,
    IDPrestacao INT,
    FOREIGN KEY (IDFuncionario) REFERENCES FUNCIONARIO(IDFuncionario),
    FOREIGN KEY (IDPrestacao) REFERENCES PRESTACAO(IDPrestacao)
)engine = InnoDB auto_increment=1 comment='Funcionários relacionados a cada prestação de serviço';

create table PRESTACAO_CUSTO(
	IDPrestacao int,
    IDCusto int,
    FOREIGN KEY (IDPrestacao) references PRESTACAO(IDPrestacao),
    FOREIGN KEY (IDCusto) references CUSTO(IDCusto)
)engine=InnoDB auto_increment=1 comment ='Relação dos custos de cada prestação';

create table PRESTACAO_DATA(
	IDPrestacao int,
    IDData int,
    FOREIGN KEY (IDPrestacao) references PRESTACAO(IDPrestacao),
    FOREIGN KEY (IDData) references DATA(IDData)
)engine=InnoDB auto_increment=1 comment = 'Relação de datas e prestações';

SHOW TABLES FROM APOLO_DB;
DESC PRESTACAO_CUSTO;
SELECT * FROM PRESTACAO_DATA;








