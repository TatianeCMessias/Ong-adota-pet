import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

const PETS_ROWS = [
  {
    'Código': 'PET-001',
    'Nome': 'Pipoca',
    'Espécie': 'Cachorro',
    'Raça': 'Vira-lata (SRD)',
    'Sexo': 'Fêmea',
    'Porte': 'Médio',
    'Idade Estimada': '1 ano',
    'Faixa Etária': 'Jovem',
    'Cor / Pelagem': 'Caramelo e Branco',
    'Peso (kg)': 14.0,
    'Castrado(a)': 'Sim',
    'Vacinado(a)': 'Sim',
    'Vermifugado(a)': 'Sim',
    'Microchipado(a)': 'Sim',
    'Nº Microchip': '981020003412541',
    'Cuidado Especial': 'Não',
    'Detalhe Cuidado Especial': '-',
    'Temperamento': 'Dócil, brincalhona, enérgica',
    'Data do Resgate': '15/03/2024',
    'Local do Resgate': 'Posto de combustível - Rod. Anchieta',
    'Status Adoção': 'Disponível',
    'Adotante': '',
    'Contato Adotante': '',
    'Data Adoção': '',
    'Observações': 'Excelente para casas com quintal, adora correr.'
  },
  {
    'Código': 'PET-002',
    'Nome': 'Oliver',
    'Espécie': 'Gato',
    'Raça': 'Siamês Mestiço',
    'Sexo': 'Macho',
    'Porte': 'Pequeno',
    'Idade Estimada': '5 meses',
    'Faixa Etária': 'Filhote',
    'Cor / Pelagem': 'Bege com pontas escuras',
    'Peso (kg)': 2.5,
    'Castrado(a)': 'Sim',
    'Vacinado(a)': 'Sim',
    'Vermifugado(a)': 'Sim',
    'Microchipado(a)': 'Sim',
    'Nº Microchip': '981020003412542',
    'Cuidado Especial': 'Não',
    'Detalhe Cuidado Especial': '-',
    'Temperamento': 'Carinhoso, calmo, ronronador',
    'Data do Resgate': '10/06/2024',
    'Local do Resgate': 'São Bernardo do Campo',
    'Status Adoção': 'Disponível',
    'Adotante': '',
    'Contato Adotante': '',
    'Data Adoção': '',
    'Observações': 'Ideal para apartamento com telas instaladas.'
  },
  {
    'Código': 'PET-003',
    'Nome': 'Thor',
    'Espécie': 'Cachorro',
    'Raça': 'Golden Retriever Mestiço',
    'Sexo': 'Macho',
    'Porte': 'Grande',
    'Idade Estimada': '3 anos',
    'Faixa Etária': 'Adulto',
    'Cor / Pelagem': 'Dourado',
    'Peso (kg)': 28.0,
    'Castrado(a)': 'Sim',
    'Vacinado(a)': 'Sim',
    'Vermifugado(a)': 'Sim',
    'Microchipado(a)': 'Sim',
    'Nº Microchip': '981020003412543',
    'Cuidado Especial': 'Não',
    'Detalhe Cuidado Especial': '-',
    'Temperamento': 'Companheiro, protetor, ama água',
    'Data do Resgate': '20/11/2023',
    'Local do Resgate': 'Campinas - Terreno baldio',
    'Status Adoção': 'Disponível',
    'Adotante': '',
    'Contato Adotante': '',
    'Data Adoção': '',
    'Observações': 'Porte grande mas dócil com crianças.'
  },
  {
    'Código': 'PET-004',
    'Nome': 'Luna',
    'Espécie': 'Gato',
    'Raça': 'Tigrada (SRD)',
    'Sexo': 'Fêmea',
    'Porte': 'Pequeno',
    'Idade Estimada': '2 anos',
    'Faixa Etária': 'Adulto',
    'Cor / Pelagem': 'Cinza rajado',
    'Peso (kg)': 3.8,
    'Castrado(a)': 'Sim',
    'Vacinado(a)': 'Sim',
    'Vermifugado(a)': 'Sim',
    'Microchipado(a)': 'Sim',
    'Nº Microchip': '981020003412544',
    'Cuidado Especial': 'Não',
    'Detalhe Cuidado Especial': '-',
    'Temperamento': 'Independente, carinhosa, tranquila',
    'Data do Resgate': '08/01/2024',
    'Local do Resgate': 'São Paulo - Centro',
    'Status Adoção': 'Disponível',
    'Adotante': '',
    'Contato Adotante': '',
    'Data Adoção': '',
    'Observações': 'Gosta de lugares altos e cafuné na orelha.'
  },
  {
    'Código': 'PET-005',
    'Nome': 'Bob',
    'Espécie': 'Cachorro',
    'Raça': 'Beagle Mestiço',
    'Sexo': 'Macho',
    'Porte': 'Médio',
    'Idade Estimada': '8 anos',
    'Faixa Etária': 'Idoso',
    'Cor / Pelagem': 'Tricolor',
    'Peso (kg)': 16.0,
    'Castrado(a)': 'Sim',
    'Vacinado(a)': 'Sim',
    'Vermifugado(a)': 'Sim',
    'Microchipado(a)': 'Sim',
    'Nº Microchip': '981020003412545',
    'Cuidado Especial': 'Sim',
    'Detalhe Cuidado Especial': 'Visão reduzida no olho esquerdo (colírio 1x ao dia)',
    'Temperamento': 'Muito calmo, afetuoso, sonolento',
    'Data do Resgate': '04/08/2023',
    'Local do Resgate': 'Santo André',
    'Status Adoção': 'Disponível',
    'Adotante': '',
    'Contato Adotante': '',
    'Data Adoção': '',
    'Observações': 'Vovô adorável, precisa de lar tranquilo e acolhedor.'
  },
  {
    'Código': 'PET-006',
    'Nome': 'Amora & Mel',
    'Espécie': 'Gato',
    'Raça': 'Irmãs (SRD)',
    'Sexo': 'Fêmea',
    'Porte': 'Pequeno',
    'Idade Estimada': '4 meses',
    'Faixa Etária': 'Filhote',
    'Cor / Pelagem': 'Preto e Laranja',
    'Peso (kg)': 1.8,
    'Castrado(a)': 'Sim',
    'Vacinado(a)': 'Sim',
    'Vermifugado(a)': 'Sim',
    'Microchipado(a)': 'Sim',
    'Nº Microchip': '981020003412546',
    'Cuidado Especial': 'Não',
    'Detalhe Cuidado Especial': '-',
    'Temperamento': 'Inseparáveis, muito ativas',
    'Data do Resgate': '22/07/2024',
    'Local do Resgate': 'São Paulo - Zona Sul',
    'Status Adoção': 'Disponível',
    'Adotante': '',
    'Contato Adotante': '',
    'Data Adoção': '',
    'Observações': 'Adoção conjunta obrigatória para não separar o par.'
  },
  {
    'Código': 'PET-007',
    'Nome': 'Max',
    'Espécie': 'Cachorro',
    'Raça': 'Pastor Alemão Mestiço',
    'Sexo': 'Macho',
    'Porte': 'Grande',
    'Idade Estimada': '1.5 anos',
    'Faixa Etária': 'Jovem',
    'Cor / Pelagem': 'Preto e Castanho',
    'Peso (kg)': 26.0,
    'Castrado(a)': 'Sim',
    'Vacinado(a)': 'Sim',
    'Vermifugado(a)': 'Sim',
    'Microchipado(a)': 'Sim',
    'Nº Microchip': '981020003412547',
    'Cuidado Especial': 'Não',
    'Detalhe Cuidado Especial': '-',
    'Temperamento': 'Inteligente, obediente, ativo',
    'Data do Resgate': '14/02/2024',
    'Local do Resgate': 'Guarulhos - Canteiro de obras',
    'Status Adoção': 'Disponível',
    'Adotante': '',
    'Contato Adotante': '',
    'Data Adoção': '',
    'Observações': 'Já sabe comandos básicos: senta, deita e dá a pata.'
  },
  {
    'Código': 'PET-008',
    'Nome': 'Chico',
    'Espécie': 'Cachorro',
    'Raça': 'Pinscher Mestiço',
    'Sexo': 'Macho',
    'Porte': 'Pequeno',
    'Idade Estimada': '4 anos',
    'Faixa Etária': 'Adulto',
    'Cor / Pelagem': 'Preto e Caramelo',
    'Peso (kg)': 5.2,
    'Castrado(a)': 'Sim',
    'Vacinado(a)': 'Sim',
    'Vermifugado(a)': 'Sim',
    'Microchipado(a)': 'Sim',
    'Nº Microchip': '981020003412548',
    'Cuidado Especial': 'Não',
    'Detalhe Cuidado Especial': '-',
    'Temperamento': 'Alerta, carinhoso com o dono, adora colo',
    'Data do Resgate': '01/04/2024',
    'Local do Resgate': 'São Paulo - Ipiranga',
    'Status Adoção': 'Disponível',
    'Adotante': '',
    'Contato Adotante': '',
    'Data Adoção': '',
    'Observações': 'Ótimo para apartamentos, porte bem pequeno.'
  },
  {
    'Código': 'PET-009',
    'Nome': 'Toby',
    'Espécie': 'Cachorro',
    'Raça': 'Vira-lata (SRD)',
    'Sexo': 'Macho',
    'Porte': 'Médio',
    'Idade Estimada': '2 anos',
    'Faixa Etária': 'Adulto',
    'Cor / Pelagem': 'Branco e Cinza',
    'Peso (kg)': 15.0,
    'Castrado(a)': 'Sim',
    'Vacinado(a)': 'Sim',
    'Vermifugado(a)': 'Sim',
    'Microchipado(a)': 'Sim',
    'Nº Microchip': '981020003412530',
    'Cuidado Especial': 'Não',
    'Detalhe Cuidado Especial': '-',
    'Temperamento': 'Alegre, sociável',
    'Data do Resgate': '10/01/2024',
    'Local do Resgate': 'São Paulo',
    'Status Adoção': 'Adotado',
    'Adotante': 'Mariana Silva',
    'Contato Adotante': '(11) 98765-1122',
    'Data Adoção': '20/03/2024',
    'Observações': 'Final feliz! Adotado e muito bem adaptado.'
  }
];

// Empty rows for volunteers to fill out
for (let i = 10; i <= 25; i++) {
  const code = `PET-0${i < 10 ? '0' + i : i}`;
  PETS_ROWS.push({
    'Código': code,
    'Nome': '',
    'Espécie': '',
    'Raça': '',
    'Sexo': '',
    'Porte': '',
    'Idade Estimada': '',
    'Faixa Etária': '',
    'Cor / Pelagem': '',
    'Peso (kg)': '',
    'Castrado(a)': '',
    'Vacinado(a)': '',
    'Vermifugado(a)': '',
    'Microchipado(a)': '',
    'Nº Microchip': '',
    'Cuidado Especial': '',
    'Detalhe Cuidado Especial': '',
    'Temperamento': '',
    'Data do Resgate': '',
    'Local do Resgate': '',
    'Status Adoção': 'Disponível',
    'Adotante': '',
    'Contato Adotante': '',
    'Data Adoção': '',
    'Observações': ''
  });
}

// 1. Create workbook
const workbook = XLSX.utils.book_new();

// Sheet 1: Cadastro dos Pets
const wsPets = XLSX.utils.json_to_sheet(PETS_ROWS);

// Set column widths for comfortable reading
wsPets['!cols'] = [
  { wch: 10 }, // Código
  { wch: 16 }, // Nome
  { wch: 12 }, // Espécie
  { wch: 22 }, // Raça
  { wch: 10 }, // Sexo
  { wch: 10 }, // Porte
  { wch: 15 }, // Idade
  { wch: 12 }, // Faixa Etária
  { wch: 20 }, // Cor / Pelagem
  { wch: 10 }, // Peso (kg)
  { wch: 12 }, // Castrado
  { wch: 12 }, // Vacinado
  { wch: 14 }, // Vermifugado
  { wch: 14 }, // Microchipado
  { wch: 18 }, // Nº Microchip
  { wch: 16 }, // Cuidado Especial
  { wch: 30 }, // Detalhe Cuidado Especial
  { wch: 30 }, // Temperamento
  { wch: 15 }, // Data Resgate
  { wch: 30 }, // Local Resgate
  { wch: 15 }, // Status Adoção
  { wch: 22 }, // Adotante
  { wch: 18 }, // Contato Adotante
  { wch: 15 }, // Data Adoção
  { wch: 35 }  // Observações
];

XLSX.utils.book_append_sheet(workbook, wsPets, 'Cadastro_de_Pets');

// Sheet 2: Instruções & Guia de Preenchimento
const INSTRUCTIONS_DATA = [
  { 'Campo': 'Código', 'Obrigatório': 'Sim', 'Opções Válidas / Formato': 'PET-001, PET-002, etc.', 'Dica de Preenchimento': 'Código único sequencial gerado para cada animal acolhido.' },
  { 'Campo': 'Nome', 'Obrigatório': 'Sim', 'Opções Válidas / Formato': 'Texto livre', 'Dica de Preenchimento': 'Nome provisório ou definitivo do pet.' },
  { 'Campo': 'Espécie', 'Obrigatório': 'Sim', 'Opções Válidas / Formato': 'Cachorro, Gato, Outro', 'Dica de Preenchimento': 'Classificação principal da espécie.' },
  { 'Campo': 'Raça', 'Obrigatório': 'Sim', 'Opções Válidas / Formato': 'Vira-lata (SRD) ou Raça pura/mestiça', 'Dica de Preenchimento': 'Se não tiver raça definida, registrar como Vira-lata (SRD).' },
  { 'Campo': 'Sexo', 'Obrigatório': 'Sim', 'Opções Válidas / Formato': 'Macho, Fêmea', 'Dica de Preenchimento': 'Sexo biológico do animal.' },
  { 'Campo': 'Porte', 'Obrigatório': 'Sim', 'Opções Válidas / Formato': 'Pequeno, Médio, Grande', 'Dica de Preenchimento': 'Pequeno (até 10kg), Médio (10 a 25kg), Grande (acima de 25kg).' },
  { 'Campo': 'Faixa Etária', 'Obrigatório': 'Sim', 'Opções Válidas / Formato': 'Filhote, Jovem, Adulto, Idoso', 'Dica de Preenchimento': 'Filhote (<1 ano), Jovem (1-2 anos), Adulto (2-7 anos), Idoso (7+ anos).' },
  { 'Campo': 'Castrado(a)', 'Obrigatório': 'Sim', 'Opções Válidas / Formato': 'Sim, Não, Agendado', 'Dica de Preenchimento': 'Todos os animais adultos devem ser doados castrados.' },
  { 'Campo': 'Vacinado(a)', 'Obrigatório': 'Sim', 'Opções Válidas / Formato': 'Sim, Não, Parcial', 'Dica de Preenchimento': 'V10/V8 + Antirrábica para cães; V4/V5 + Antirrábica para gatos.' },
  { 'Campo': 'Status Adoção', 'Obrigatório': 'Sim', 'Opções Válidas / Formato': 'Disponível, Em Análise, Adotado, Lar Temporário, Quarentena', 'Dica de Preenchimento': 'Atualizar assim que o animal for reservado ou adotado.' }
];

const wsInstructions = XLSX.utils.json_to_sheet(INSTRUCTIONS_DATA);
wsInstructions['!cols'] = [
  { wch: 18 },
  { wch: 14 },
  { wch: 35 },
  { wch: 55 }
];
XLSX.utils.book_append_sheet(workbook, wsInstructions, 'Instrucoes_Preenchimento');

// Sheet 3: Métricas & Indicadores
const METRICS_DATA = [
  { 'Indicador': 'Total de Pets Cadastrados', 'Quantidade': 9, 'Observações': 'Pets com registro ativo no sistema' },
  { 'Indicador': 'Pets Disponíveis para Adoção', 'Quantidade': 8, 'Observações': 'Prontos para receber propostas' },
  { 'Indicador': 'Pets com Adoção Concluída', 'Quantidade': 1, 'Observações': 'Finais felizes no ano vigente' },
  { 'Indicador': 'Total de Cães', 'Quantidade': 6, 'Observações': '66.7% do abrigo' },
  { 'Indicador': 'Total de Gatos', 'Quantidade': 3, 'Observações': '33.3% do abrigo' },
  { 'Indicador': 'Total de Animais Castrados', 'Quantidade': 9, 'Observações': '100% de cobertura cirúrgica' },
  { 'Indicador': 'Total de Animais Microchipados', 'Quantidade': 9, 'Observações': '100% identificados' },
  { 'Indicador': 'Animais com Cuidados Especiais', 'Quantidade': 1, 'Observações': 'Acompanhamento veterinário contínuo' }
];

const wsMetrics = XLSX.utils.json_to_sheet(METRICS_DATA);
wsMetrics['!cols'] = [
  { wch: 35 },
  { wch: 15 },
  { wch: 45 }
];
XLSX.utils.book_append_sheet(workbook, wsMetrics, 'Resumo_Indicadores');

// Write .xlsx file
const xlsxPath = path.resolve('planilha-cadastro-pets.xlsx');
XLSX.writeFile(workbook, xlsxPath);
console.log('Arquivo XLSX criado com sucesso em:', xlsxPath);

// Write .csv file (encoded in UTF-8 with BOM and semicolon separator for seamless opening in Excel Brasil)
const headers = Object.keys(PETS_ROWS[0]);
let csvContent = '\uFEFF' + headers.join(';') + '\r\n';

for (const row of PETS_ROWS) {
  const line = headers.map(header => {
    const val = row[header] !== undefined && row[header] !== null ? String(row[header]) : '';
    // Escape quotes if needed
    if (val.includes(';') || val.includes('"') || val.includes('\n')) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  }).join(';');
  csvContent += line + '\r\n';
}

const csvPath = path.resolve('planilha-cadastro-pets.csv');
fs.writeFileSync(csvPath, csvContent, 'utf-8');
console.log('Arquivo CSV criado com sucesso em:', csvPath);
