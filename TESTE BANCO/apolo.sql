create database APOLLO;
use APOLLO;

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
    IDCliente INT,
    FOREIGN KEY (IDCliente) REFERENCES CLIENTE(IDCliente)
)engine = InnoDB auto_increment=1 comment='Cadastro de prestações de serviço realizadas';

create table PRESTACAO_FUNCIONARIO (
    IDFuncionario INT,
    IDPrestacao INT,
    FOREIGN KEY (IDFuncionario) REFERENCES FUNCIONARIO(IDFuncionario),
    FOREIGN KEY (IDPrestacao) REFERENCES PRESTACAO(IDPrestacao)
)engine = InnoDB comment='Funcionários relacionados a cada prestação de serviço';

create table PRESTACAO_CUSTO(
	IDPrestacao int,
    IDCusto int,
    FOREIGN KEY (IDPrestacao) references PRESTACAO(IDPrestacao),
    FOREIGN KEY (IDCusto) references CUSTO(IDCusto)
)engine=InnoDB comment ='Relação dos custos de cada prestação';

create table PRESTACAO_DATA(
	IDPrestacao int,
    IDData int,
    FOREIGN KEY (IDPrestacao) references PRESTACAO(IDPrestacao),
    FOREIGN KEY (IDData) references DATA(IDData)
)engine=InnoDB comment = 'Relação de datas e prestações';

create table PRESTACAO_SERVICO(
	IDPrestacao int,
    IDServico int,
    Custo DECIMAL(10, 2),
    FOREIGN KEY (IDPrestacao) references PRESTACAO(IDPrestacao),
    FOREIGN KEY (IDServico) references SERVICO(IDServico)
)engine=InnoDB comment = 'Relação de servicos e prestações';
