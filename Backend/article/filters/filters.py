from elasticsearch_dsl import Q


class ArticleFilter:
    def filter(self, search, value):
        raise NotImplementedError("Subclasses must implement the apply method.")


class KeywordsFilter(ArticleFilter):
    def filter(self, search, keywords):
        should_queries = [
            Q('match', keywords={'query': keyword, 'fuzziness': 'AUTO'}) for keyword in keywords
        ]
<<<<<<< HEAD
<<<<<<< HEAD
        return search.query('bool', should=should_queries)
=======
        return search.query('bool', must=should_queries)
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
        return search.query('bool', should=should_queries)
>>>>>>> 2d5912ec (added extraction and ui prototype for article editing)


class AuthorsFilter(ArticleFilter):
    def filter(self, search, authors):
        should_queries = [
            Q('match', meta_data__authors__name={'query': keyword, 'fuzziness': 'AUTO'}) for keyword in authors
<<<<<<< HEAD
=======
            Q('match', authors={'query': keyword, 'fuzziness': 'AUTO'}) for keyword in authors
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
>>>>>>> 2d60e561 (added Article Index + Filter Function + Need to create the api)
        ]
        return search.query('bool', should=should_queries)


class InstitutionsFilter(ArticleFilter):
    def filter(self, search, institutions):
        return search.query('match', meta_data__institutions__name=institutions)
<<<<<<< HEAD
=======
        return search.query('match', institutions=institutions)
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
>>>>>>> 2d60e561 (added Article Index + Filter Function + Need to create the api)


class DateRangeFilter(ArticleFilter):
    def filter(self, search, period):
        return search.filter('range', meta_data__pub_date={'gte': period[0], 'lte': period[1]})
<<<<<<< HEAD
=======
        return search.filter('range', publication_date={'gte': period[0], 'lte': period[1]})
>>>>>>> 0747a443 (added Article Index + Filter Function + Need to create the api)
=======
>>>>>>> 2d60e561 (added Article Index + Filter Function + Need to create the api)
