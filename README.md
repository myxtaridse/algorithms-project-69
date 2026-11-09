### Hexlet tests and linter status:
[![Actions Status](https://github.com/myxtaridse/algorithms-project-69/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/myxtaridse/algorithms-project-69/actions) [![test-check](https://github.com/myxtaridse/algorithms-project-69/actions/workflows/test-check.yml/badge.svg)](https://github.com/myxtaridse/algorithms-project-69/actions/workflows/test-check.yml) [![Build](https://github.com/myxtaridse/algorithms-project-69/actions/workflows/sonar_qube.yml/badge.svg)](https://github.com/myxtaridse/algorithms-project-69/actions/workflows/sonar_qube.yml)

# Поисковый движок
«Поисковый движок» - это проект для изучения основных алгоритмов и структур данных, используемых в поисковых системах. 

В проекте реализован поиск по коллекции текстовых документов с использованием обратного индекса и алгоритма ранжирования TF-IDF.

## Требования:
- Unix system (Macos/Linux)
- Nodejs 22.x+
- Make

## Описание:
Проект предоставляет:
- **Обратный индекс:** структурированный словарь формата `{ word: [<id_doc>] }`. Повторяющиеся идентификаторы документов позволяют учитывать частоту вхождения слова в документе.
- **Поиск по нескольким словам:** обработка составных поисковых запросов с поиском документов, содержащих хотя бы одно из искомых слов.
- **Расчет релевантности:** использование алгоритма TF-IDF, учитывающего частоту слова внутри документа (TF) и его редкость во всей коллекции документов (IDF).
- **Ранжирование результатов:** вычисление общей оценки документа на основе весов совпавших слов и сортировка документов по убыванию релевантности. 

## Установка:
```bash
git clone https://github.com/myxtaridse/algorithms-project-69.git
cd algorithms-project-69
make install
```

## Использование:
```javascript
import search from '@hexlet/code';

const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
const doc2 = { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." };
const doc3 = { id: 'doc3', text: "I'm your shooter." };
const docs = [doc1, doc2, doc3];

search(docs, 'shoot'); // ['doc2', 'doc1']
```

## Run tests
```bash
make test
```
